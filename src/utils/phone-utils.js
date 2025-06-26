export const normalizePhone = (value) => {
    if (!value) return '';
    
	const digits = value.replace(/\D/g, '');

	if (digits.startsWith('0')) return '254' + digits.slice(1);

	if (digits.startsWith('254')) return digits;

	if (digits.length === 9 && digits.startsWith('7')) return '254' + digits;

	return digits;
};

export function isValidPhoneNumber(phone) {
	return /^2547\d{8}$/.test(phone);
}
