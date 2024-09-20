import { Card, Input, Button, Typography } from "@material-tailwind/react";
import DatePicker from "./date-picker"; // Custom date-picker component

import axios from "axios";
import { createRecord } from "../routes/apiRoutes";
import { useLoaderData, useNavigate } from "react-router-dom";
import useHealthRecordForm from "../hook/useHealthRecordForm";
import toast from "react-hot-toast";

export default function RecordForm() {
  const loaderData = useLoaderData() || {};
  const { data } = loaderData || {};

  const navigate = useNavigate();
  const {
    date,
    setDate,
    bodyTemperature,
    setBodyTemperature,
    bloodPressure,
    setBloodPressure,
    heartRate,
    setHeartRate,
  } = useHealthRecordForm(data || {});

  const title = data ? "Update Record" : "Add Record";

  const handleRecord = async (e) => {
    e.preventDefault();
    const validDate = new Date(date);

    if (isNaN(validDate.getTime())) {
      console.error("Invalid date:", date);
      toast.error("Please provide a valid date");
      return;
    }

    const recordData = {
      date: validDate.toISOString(), // Convert date to ISO format
      bodyTemperature: {
        value: bodyTemperature.value,
        unit: bodyTemperature.unit,
      },
      bloodPressure: {
        systolic: bloodPressure.systolic,
        diastolic: bloodPressure.diastolic,
      },
      heartRate,
    };

    if (data) {
      try {
        try {
          const response = await axios.put(
            `${createRecord}/${data._id}`,
            recordData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Record updated successfully:", response.data);
          toast.success("Record updated successfully");
          navigate("/record");
        } catch (error) {
          console.error("Error updating record:", error);
          toast.error("Failed to update the record");
        }
      } catch (error) {
        console.error("Error adding record:", error);
      }
    } else {
      try {
        const response = await axios.post(createRecord, recordData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Record added successfully:", response.data);
        toast.success("Add Record");
        navigate("/record");
      } catch (error) {
        console.error("Error adding record:", error);
      }
    }
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        {title}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your health details below.
      </Typography>

      <form
        onSubmit={handleRecord}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        {/* Date Picker */}
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Date
          </Typography>
          <DatePicker date={date} setDate={setDate} />
        </div>

        {/* Body Temperature */}
        <div className="mb-1 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Body Temperature ({bodyTemperature.unit})
            </Typography>
            <select
              value={bodyTemperature.unit}
              onChange={(e) =>
                setBodyTemperature({ ...bodyTemperature, unit: e.target.value })
              }
              className="mt-2"
            >
              <option value="F">Fahrenheit</option>
              <option value="C">Celsius</option>
            </select>
          </div>
          <Input
            size="lg"
            type="number"
            value={bodyTemperature.value}
            onChange={(e) =>
              setBodyTemperature({
                ...bodyTemperature,
                value: e.target.value,
              })
            }
            placeholder="e.g., 36.6"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        {/* Blood Pressure */}
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Blood Pressure (Systolic)
          </Typography>
          <Input
            size="lg"
            type="number"
            value={bloodPressure.systolic}
            onChange={(e) =>
              setBloodPressure({
                ...bloodPressure,
                systolic: e.target.value,
              })
            }
            placeholder="e.g., 120"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Blood Pressure (Diastolic)
          </Typography>
          <Input
            size="lg"
            type="number"
            value={bloodPressure.diastolic}
            onChange={(e) =>
              setBloodPressure({
                ...bloodPressure,
                diastolic: e.target.value,
              })
            }
            placeholder="e.g., 80"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        {/* Heart Rate */}
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Heart Rate (bpm)
          </Typography>
          <Input
            size="lg"
            type="number"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            placeholder="e.g., 75"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        {/* Terms and Conditions */}

        {/* Submit Button */}
        <Button type="submit" className="mt-6" fullWidth>
          {title}
        </Button>
      </form>
    </Card>
  );
}
