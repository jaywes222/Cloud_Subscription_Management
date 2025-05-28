import { parseAsBoolean, useQueryState } from "nuqs";

const usePayNowDialog = () => {
    const [open, setOpen] = useQueryState(
        "pay-now",
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

export default usePayNowDialog;
