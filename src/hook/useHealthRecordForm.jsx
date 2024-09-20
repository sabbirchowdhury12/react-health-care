import { useState, useEffect } from "react";

const useHealthRecordForm = (initialData = {}) => {
  const [date, setDate] = useState(initialData?.date || "");
  const [bodyTemperature, setBodyTemperature] = useState({
    value: initialData?.bodyTemperature?.value || "",
    unit: initialData?.bodyTemperature?.unit || "F",
  });
  const [bloodPressure, setBloodPressure] = useState({
    systolic: initialData?.bloodPressure?.systolic || "",
    diastolic: initialData?.bloodPressure?.diastolic || "",
  });
  const [heartRate, setHeartRate] = useState(initialData?.heartRate || "");
  const [title, setTitle] = useState(
    initialData ? "Update Record" : "Add Record"
  );

  useEffect(() => {
    // Only update the state when initialData changes
    if (initialData && initialData.date !== date) {
      setDate(initialData?.date || "");
    }

    if (
      initialData?.bodyTemperature?.value !== bodyTemperature.value ||
      initialData?.bodyTemperature?.unit !== bodyTemperature.unit
    ) {
      setBodyTemperature({
        value: initialData?.bodyTemperature?.value || "",
        unit: initialData?.bodyTemperature?.unit || "F",
      });
    }

    if (
      initialData?.bloodPressure?.systolic !== bloodPressure.systolic ||
      initialData?.bloodPressure?.diastolic !== bloodPressure.diastolic
    ) {
      setBloodPressure({
        systolic: initialData?.bloodPressure?.systolic || "",
        diastolic: initialData?.bloodPressure?.diastolic || "",
      });
    }

    if (initialData?.heartRate !== heartRate) {
      setHeartRate(initialData?.heartRate || "");
    }

    if (initialData?.id) {
      setTitle("Update Record");
    } else {
      setTitle("Add Record");
    }
  }, []); // Depend only on initialData

  return {
    date,
    setDate,
    bodyTemperature,
    setBodyTemperature,
    bloodPressure,
    setBloodPressure,
    heartRate,
    setHeartRate,
    title,
  };
};

export default useHealthRecordForm;
