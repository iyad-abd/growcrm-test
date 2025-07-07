import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createClient } from "../../redux/action/user";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Divider,
  useMediaQuery
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateClient = ({ open, setOpen, scroll }) => {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);
  const initialClientState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  };
  const [clientData, setClientData] = useState(initialClientState);
  const [validationError, setValidationError] = useState({});
  const isMobile = useMediaQuery('(max-width: 640px)');

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, password, phone } = clientData;
    let errors = {};
    if (!firstName) errors.firstName = "First name is required";
    if (!lastName) errors.lastName = "Last name is required";
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    if (!phone) errors.phone = "Phone is required";
    setValidationError(errors);
    if (Object.keys(errors).length > 0) return;
    dispatch(createClient(clientData));
    setClientData(initialClientState);
    setValidationError({});
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setClientData(initialClientState);
    setValidationError({});
  };

  return (
    <Dialog
      scroll={scroll}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="flex items-center justify-between px-2 sm:px-6">
        <div className="text-sky-400 font-primary text-lg sm:text-xl">Add New Client</div>
        <div className="cursor-pointer" onClick={handleClose}>
          <PiXLight className="text-[25px]" />
        </div>
      </DialogTitle>
      <DialogContent className="px-2 sm:px-6">
        <div className="flex flex-col gap-2 p-1 sm:p-3 text-gray-500 font-primary">
          <div className="text-lg sm:text-xl flex justify-start items-center gap-2 font-normal">
            <PiNotepad size={23} />
            <span>Client Details</span>
          </div>
          <Divider />
          <div className="w-full">
            <table className="mt-4 w-full">
              <tbody>
                <tr className="flex flex-col sm:table-row">
                  <td className="pb-2 sm:pb-4 text-base sm:text-lg">First Name </td>
                  <td className="pb-2 sm:pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      error={!!validationError.firstName}
                      helperText={validationError.firstName}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <td className="pb-2 sm:pb-4 text-base sm:text-lg">Last Name </td>
                  <td className="pb-2 sm:pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      error={!!validationError.lastName}
                      helperText={validationError.lastName}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <td className="pb-2 sm:pb-4 text-base sm:text-lg">User Name </td>
                  <td className="pb-2 sm:pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData.username}
                      onChange={(e) => handleChange("username", e.target.value)}
                      error={!!validationError.username}
                      helperText={validationError.username}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <td className="pb-2 sm:pb-4 text-base sm:text-lg">Email </td>
                  <td className="pb-2 sm:pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Optional"
                      value={clientData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <td className="flex items-start pt-1 sm:pt-2 text-base sm:text-lg">Password </td>
                  <td className="pb-2 sm:pb-4">
                    <TextField
                      type="password"
                      value={clientData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      size="small"
                      fullWidth
                      error={!!validationError.password}
                      helperText={validationError.password}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <td className="flex items-start pt-1 sm:pt-2 text-base sm:text-lg">Phone </td>
                  <td className="pb-2 sm:pb-4">
                    <TextField
                      type="number"
                      size="small"
                      value={clientData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      fullWidth
                      error={!!validationError.phone}
                      helperText={validationError.phone}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="px-2 sm:px-6 pb-2 sm:pb-4">
        <button
          onClick={handleClose}
          variant="contained"
          type="reset"
          className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          variant="contained"
          className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
        >
          {isFetching ? "Submitting..." : "Submit"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClient; 