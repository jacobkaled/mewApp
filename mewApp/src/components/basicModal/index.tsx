import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BasicModal(props: ModalProps) {
  const { open, onClose, children } = props;
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "hidden" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            maxHeight: "80%",
            height: "600px",
            overflow: "hidden",
            padding: "20px",
          }}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
}
