import { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Job } from '../models/job';

export default function JobForm({
  job,
  onSubmit,
}: {
  job?: Job;
  onSubmit: (values: any) => void;
}) {
  const [licensePlate, setLicensePlate] = useState(job?.licensePlate || '');
  const [mileage, setMileage] = useState(job?.mileage || '');
  const [description, setDescription] = useState(job?.description || '');
  const [timeSpent, setTimeSpent] = useState(job?.timeSpent || '');
  const [partInput, setPartInput] = useState('');
  const [partsUsed, setPartsUsed] = useState<string[]>(job?.partsUsed || []);
  const [errors, setErrors] = useState<{ licensePlate?: string; description?: string }>({});

  const addPart = () => {
    if (partInput.trim()) {
      setPartsUsed([...partsUsed, partInput.trim()]);
      setPartInput('');
    }
  };

  const handleSubmit = () => {
    const newErrors: { licensePlate?: string; description?: string } = {};
    if (!licensePlate.trim()) {
      newErrors.licensePlate = 'License plate is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      licensePlate,
      mileage,
      description,
      timeSpent,
      partsUsed,
    });
  };

  return (
    <View style={styles.container}>
      <Text>License Plate:</Text>
      <TextInput
        placeholder="ABC 1234"
        value={licensePlate}
        onChangeText={setLicensePlate}
        style={styles.input}
      />
      {errors.licensePlate && <Text style={styles.errorText}>{errors.licensePlate}</Text>}

      <Text>Mileage:</Text>
      <TextInput
        placeholder="12345"
        value={mileage}
        onChangeText={setMileage}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text>Description:</Text>
      <TextInput
        placeholder="Describe the job"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

      <Text>Time Spent:</Text>
      <TextInput
        placeholder="e.g. 2 hours"
        value={timeSpent}
        onChangeText={setTimeSpent}
        style={styles.input}
      />

      <Text>Parts Used:</Text>
      <View style={styles.partsContainer}>
        <TextInput
          placeholder="Add part"
          value={partInput}
          onChangeText={setPartInput}
          style={styles.input}
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  partsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});