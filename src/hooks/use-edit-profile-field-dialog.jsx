import { useCallback } from "react";
import { useQueryState, parseAsString } from "nuqs";

const useEditProfileFieldDialog = () => {
    // field being edited or null if closed
    const [field, setField] = useQueryState("edit-profile-field", parseAsString.withDefault(null));
    // initial value for the field or null
    const [value, setValue] = useQueryState("edit-profile-value", parseAsString.withDefault(null));

    // open if a field is set
    const open = field !== null;

    // Open dialog with field and initial value
    const onOpen = useCallback((fieldName, initialValue = "") => {
        setField(fieldName);
        setValue(initialValue);
    }, [setField, setValue]);

    // Close dialog and clear query params
    const onClose = useCallback(() => {
        setField(null);
        setValue(null);
    }, [setField, setValue]);

    return {
        open,
        field,
        value,
        onOpen,
        onClose,
    };
};

export default useEditProfileFieldDialog;
