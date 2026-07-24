import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryGroup, VictoryLegend } from 'victory-native';
import { Picker } from '@react-native-picker/picker'; // <-- Importiamo il selettore universale
import { secureFetch } from '../apiClient';

export default function Consumi() {
  const [storico, setStorico] = useState([]);
  const [annoSelezionato, setAnnoSelezionato] = useState('confronto'); // '2025', '2026' o 'confronto'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    secureFetch('/api/getConsumi')
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setStorico(resData.dati);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Errore consumi:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0078d4" />
        <Text style={styles.loadingText}>Elaborazione dati storici...</Text>
      </View>
    );
  }

  // FILTRAGGIO E DIVISIONE DEI DATI PER ANNO
  const dati2025 = storico.filter(d => d.anno === 2025);
  const dati2026 = storico.filter(d => d.anno === 2026);

  // Decidiamo cosa mostrare nel grafico in base al Picker
  const getDatiGrafico = () => {
    if (annoSelezionato === '2025') return dati2025;
    if (annoSelezionato === '2026') return dati2026;
    return []; // Gestito autonomamente da VictoryGroup nel confronto
  };

  // ELENCO DELLE VARIAZIONI MENSILI (2026 vs 2025)
  // Cicliamo sui mesi del 2026 (che ha meno mesi) per trovare il corrispettivo nel 2025
  const variazioniAnnoSuAnno = dati2026.map(m26 => {
    const m25 = dati2025.find(m => m.mese === m26.mese);
    if (!m25) return null;
    const differenza = m26.kwh - m25.kwh;
    return {
      mese: m26.mese,
      diff: differenza,
      segno: differenza > 0 ? `+${differenza}` : `${differenza}`
    };
  }).filter(Boolean);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analisi Energetica Consumi Luce</Text>
      <Text style={styles.subtitle}>Rilevazioni storiche in tempo reale espresse in chilowattora (kWh)</Text>

      {/* STRUMENTO DI FILTRO (PICKER) */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Seleziona Periodo di Visualizzazione:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={annoSelezionato}
            onValueChange={(itemValue) => setAnnoSelezionato(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="📊 Confronto Anni (2025 vs 2026)" value="confronto" />
            <Picker.Item label="Calendario Annuale 2025" value="2025" />
            <Picker.Item label="Calendario Annuale 2026" value="2026" />
          </Picker>
        </View>
      </View>

      {/* RENDERING DEL GRAFICO COMPOSITO */}
      <View style={styles.chartContainer}>
        <VictoryChart theme={VictoryTheme.material} domainPadding={25} width={650} height={350}>
          
          {/* Legenda Esplicativa */}
          <VictoryLegend x={180} y={10}
            orientation="horizontal"
            gutter={20}
            style={{ labels: { fontSize: 11 } }}
            data={[
              { name: "Anno 2025", symbol: { fill: "#a0c4ff" } },
              { name: "Anno 2026", symbol: { fill: "#0078d4" } }
            ]}
          />

          <VictoryAxis tickValues={dati2025.map(d => d.mese)} style={{ tickLabels: { fontSize: 10 } }} />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x} kWh`} style={{ tickLabels: { fontSize: 10 } }} />

          {annoSelezionato === 'confronto' ? (
            // MODALITÀ CONFRONTO: Barre affiancate automaticamente tramite VictoryGroup
            <VictoryGroup offset={14}>
              <VictoryBar data={dati2025} x="mese" y="kwh" style={{ data: { fill: "#a0c4ff", width: 12 } }} />
              <VictoryBar data={dati2026} x="mese" y="kwh" style={{ data: { fill: "#0078d4", width: 12 } }} />
            </VictoryGroup>
          ) : (
            // MODALITÀ ANNO SINGOLO
            <VictoryBar
              data={getDatiGrafico()}
              x="mese"
              y="kwh"
              style={{ data: { fill: annoSelezionato === '2025' ? "#a0c4ff" : "#0078d4", width: 22 } }}
            />
          )}
        </VictoryChart>
      </View>

      {/* TABELLA DELLE VARIAZIONI ANNO SU ANNO (+/-) */}
      <Text style={styles.sectionTitle}>Delta Variazione Anno su Anno (YoY)</Text>
      <View style={styles.deltaContainer}>
        {variazioniAnnoSuAnno.map(v => (
          <View key={v.mese} style={styles.deltaCard}>
            <Text style={styles.deltaMese}>{v.mese}</Text>
            <Text style={[styles.deltaValore, v.diff > 0 ? styles.textSu : styles.textGiu]}>
              {v.segno} kWh
            </Text>
            <Text style={styles.deltaSub}>{v.diff > 0 ? '🔺 Aumento' : '📉 Risparmio'}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f4f4f9' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  loadingText: { marginTop: 10, color: '#666' },
  
  // Stili per il Picker/Filtro
  filterContainer: { marginBottom: 20, backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  filterLabel: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8 },
  pickerWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, backgroundColor: '#fafafa', overflow: 'hidden' },
  picker: { height: 45, width: '100%', borderWidth: 0, paddingHorizontal: 10, fontSize: 15 },

  chartContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', alignItems: 'center', marginBottom: 25 },
  
  // Stili per le schede del Delta Variazione
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  deltaContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 40 },
  deltaCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#e0e0e0', minWidth: 100, flex: 1, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  deltaMese: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 4 },
  deltaValore: { fontSize: 16, fontWeight: 'bold' },
  deltaSub: { fontSize: 11, color: '#999', marginTop: 2 },
  textSu: { color: '#d83b01' }, // Rosso aziendale per aumento consumi
  textGiu: { color: '#107c41' } // Verde aziendale per risparmio energetico
});
