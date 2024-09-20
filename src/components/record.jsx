/* eslint-disable react/prop-types */
import { AiFillDelete } from "react-icons/ai";
import { Card, Typography } from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

// Helper function to format the date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" }; // Format: "20 Jul 2024"
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const TABLE_HEAD = [
  "Date",
  "Body Temperature",
  "Blood Pressure",
  "Heart Rate",
  "Actions",
];

const Record = ({
  records,
  handleDelete,
  open,
  handleCloseDialog,
  handleDeleteConfirmed,
}) => {
  return (
    <div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map(
              (
                { date, bloodPressure, bodyTemperature, heartRate, _id },
                index
              ) => (
                <tr key={index} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {formatDate(date)} {/* Format date here */}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {bodyTemperature?.value}°{bodyTemperature?.unit}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {`${bloodPressure?.systolic} / ${bloodPressure?.diastolic}`}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {heartRate}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleDelete(_id)}>
                        <AiFillDelete />
                      </button>
                      <Link to={`/edit-record/${_id}`}>
                        <MdEdit />
                      </Link>
                      <Link to={`/details/${_id}`}>
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={open} handler={handleCloseDialog}>
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this record? This action cannot be
          undone.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseDialog} // Close without deletion
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleDeleteConfirmed}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Record;
