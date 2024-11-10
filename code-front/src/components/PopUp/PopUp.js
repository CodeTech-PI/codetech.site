// PopUp.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import "./PopUp.css";

const PopUp = ({
  isOpen,
  onRequestClose,
  onSubmit, 
  initialData = {}, 
  fields = [], 
  title = "Adicionar Item",
  submitButtonLabel = "Adicionar", 
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onRequestClose();
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose} className="custom-dialog">
      <DialogTitle className="dialog-title">{title}</DialogTitle>
      <form onSubmit={handleSubmit} className="form-container">
        <DialogContent>
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type={field.type || "text"}
              InputProps={{ className: "input-field" }}
            />
          ))}
        </DialogContent>
        <DialogActions className="button-container">
          <Button onClick={onRequestClose} className="cancel-button">
            Cancelar
          </Button>
          <Button type="submit" className="submit-button">
            {submitButtonLabel}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PopUp;
