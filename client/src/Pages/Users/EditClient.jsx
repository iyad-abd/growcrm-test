import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/action/user";
import { Divider, Dialog, DialogContent, DialogTitle, Slide, DialogActions, TextField, useMediaQuery } from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditClient = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { currentEmployee, isFetching } = useSelector((state) => state.user);
  const initialClientState = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
  };
  const [clientData, setClientData] = useState(currentEmployee);
  const isMobile = useMediaQuery('(max-width: 640px)');
  useEffect(() => {
    setClientData(currentEmployee);
  }, [currentEmployee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(currentEmployee._id, clientData, clientData?.role));
    setClientData(initialClientState);
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      scroll={"paper"}
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
        <div className="text-sky-400 font-primary text-lg sm:text-xl">Edit Client</div>
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
                      value={clientData?.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <td className="pb-2 sm:pb-4 text-base sm:text-lg">Last Name </td>
                  <td className="pb-2 sm:pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData?.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                      value={clientData?.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <td className="pb-2 sm:pb-4 text-base sm:text-lg">User Name </td>
                  <td className="pb-2 sm:pb-4">
                    <TextField
                      size="small"
                      fullWidth
                      value={clientData?.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="flex flex-col sm:table-row">
                  <td className="flex items-start pt-1 sm:pt-2 text-base sm:text-lg">Phone </td>
                  <td className="pb-2 sm:pb-4">
                    <TextField
                      type="number"
                      size="small"
                      value={clientData?.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      fullWidth
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

export default EditClient; 