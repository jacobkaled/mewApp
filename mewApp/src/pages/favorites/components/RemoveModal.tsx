import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type RemoveModalProps = {
  title: string;
  isLoading: boolean;
  isDeleteModalOpen: boolean;
  onCloseModal: () => void;
  onDeleteAttribute: () => void;
};

export default function RemoveModal(props: RemoveModalProps) {
  const {
    isLoading,
    title,
    isDeleteModalOpen,
    onCloseModal,
    onDeleteAttribute,
  } = props;
  return (
    <Dialog open={isDeleteModalOpen} maxWidth="sm" onClose={onCloseModal}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onCloseModal}>close</Button>
        <Button onClick={onDeleteAttribute} autoFocus disabled={isLoading}>
          {isLoading ? "removing" : "remove"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
