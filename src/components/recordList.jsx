import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Record from "./record";
import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { createRecord, getAllRecord } from "../routes/apiRoutes";
import toast from "react-hot-toast";

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null); // To hold the record to be deleted
  const [searchQuery, setSearchQuery] = useState("");
  const [recordList, setRecordList] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(getAllRecord);
        setRecordList(data?.data);
        setRecords(data?.data); // Initialize records with fetched data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter the records based on the query
    const filteredRecords = recordList.filter((record) => {
      return (
        record.date.includes(query) ||
        record.bodyTemperature.value.toString().includes(query) ||
        `${record.bloodPressure.systolic}/${record.bloodPressure.diastolic}`
          .toString()
          .includes(query) ||
        record.heartRate.toString().includes(query)
      );
    });

    setRecords(filteredRecords); // Update the records with filtered results
  };

  // Open the delete confirmation modal
  const handleOpenDialog = (id) => {
    setSelectedRecord(id); // Store the id of the record to be deleted
    setOpen(true); // Open the modal
  };

  // Close the dialog without deleting
  const handleCloseDialog = () => {
    setOpen(false); // Close the modal
    setSelectedRecord(null); // Clear the selected record
  };

  // Handle deletion confirmation
  const handleDeleteConfirmed = async () => {
    if (!selectedRecord) return; // Safety check in case no record is selected
    try {
      await axios.delete(`${createRecord}/${selectedRecord}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Record deleted successfully");

      // Update the records state to reflect deletion
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record._id !== selectedRecord)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Failed to delete the record");
    }
    setOpen(false); // Close the modal
    setSelectedRecord(null); // Clear the selected record
  };

  return (
    <div>
      <h1 className="text-lg font-bold">Health Metrics Dashboard</h1>
      <Link to="/add-record">
        <Button className="mt-6">Add Record</Button>
      </Link>

      {/* Search Input Field */}
      <div className="my-4">
        <Input
          type="text"
          placeholder="Search by date, temperature, blood pressure, or heart rate"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <Record
        records={records}
        handleDelete={handleOpenDialog}
        open={open}
        handleCloseDialog={handleCloseDialog}
        handleDeleteConfirmed={handleDeleteConfirmed}
      />
    </div>
  );
};

export default RecordList;
