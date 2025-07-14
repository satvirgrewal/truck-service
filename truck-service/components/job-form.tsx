import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

export default function JobForm({
  initialValues = {},
  onSubmit,
}: {
  initialValues?: {
    licensePlate?: string;
    mileage?: string;
    description?: string;
    timeSpent?: string;
    partsUsed?: string[];
  };
  onSubmit: (values: any) => void;
}) {

  const [licensePlate, setLicensePlate] = useState(initialValues.licensePlate || '');
  const [mileage, setMileage] = useState(initialValues.mileage || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [timeSpent, setTimeSpent] = useState(initialValues.timeSpent || '');
  const [partInput, setPartInput] = useState('');
  const [partsUsed, setPartsUsed] = useState<string[]>(initialValues.partsUsed || []);

    const addPart = () => {
    if (partInput.trim()) {
      setPartsUsed([...partsUsed, partInput.trim()]);
      setPartInput('');
    }
  };

  const handleSubmit = () => {
    onSubmit({
      licensePlate,
      mileage,
      description,
      timeSpent,
      partsUsed,
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>License Plate:</Text>
      <TextInput
        placeholder="ABC 1234"
        value={licensePlate}
        onChangeText={setLicensePlate}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      
      <Text>Mileage:</Text>
      <TextInput
        placeholder="12345"
        value={mileage}
        onChangeText={setMileage}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Description:</Text>
      <TextInput
        placeholder="Describe the job"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Time Spent:</Text>
      <TextInput
        placeholder="e.g. 2 hours"
        value={timeSpent}
        onChangeText={setTimeSpent}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Parts Used:</Text>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
          placeholder="Add part"
          value={partInput}
          onChangeText={setPartInput}
          style={{ borderWidth: 1, flex: 1, padding: 8 }}
        />
        <Button title="Add Part" onPress={addPart} />
      </View>
      <FlatList
        data={partsUsed}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => <Text>- {item}</Text>}
      />
      
      <Button title="Submit Job" onPress={handleSubmit} />
    </View>
  );
}