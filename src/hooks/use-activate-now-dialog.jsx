import { parseAsBoolean, useQueryState } from "nuqs";

const useActivateNowDialog = () => {
    const [open, setOpen] = useQueryState(
        "activate-now",
        parseAsBoolean.withDefault(false)
    );

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return {
        open,
        onOpen,
        onClose,
    };
};

export default useActivateNowDialog;
