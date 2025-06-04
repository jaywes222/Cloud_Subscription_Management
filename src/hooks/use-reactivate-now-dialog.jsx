import { parseAsBoolean, useQueryState } from "nuqs";

const useReactivateNowDialog = () => {
    const [open, setOpen] = useQueryState(
        "reactivate-now",
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

export default useReactivateNowDialog;
