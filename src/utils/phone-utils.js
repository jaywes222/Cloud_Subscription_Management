export const normalizePhone = (value) => {
	if (!value) return '';

	const digits = value.replace(/\D/g, '');

	if (digits.startsWith('0')) return '254' + digits.slice(1); // 07xxxxxxxx -> 2547xxxxxxxx

	if (digits.startsWith('254')) return digits; // Already normalized

	if (digits.length === 9 && digits.startsWith('7')) return '254' + digits; // 7xxxxxxxx -> 2547xxxxxxxx

	return digits;
};

export const denormalizePhone = (value) => {
	if (!value) return '';

	const digits = value.replace(/\D/g, '');

	if (digits.startsWith('2547') && digits.length === 12) {
		return '0' + digits.slice(3); // 2547xxxxxxxx -> 07xxxxxxxx
	}

	if (digits.startsWith('07') && digits.length === 10) {
		return digits; // Already denormalized
	}

	return digits; // Fallback
};

/**
 * Validate if phone is in proper normalized format: 2547XXXXXXXX
 */
export const isValidPhoneNumber = (phone) => {
	return /^2547\d{8}$/.test(phone);
};

/**
   * Validate if phone is in proper denormalized format: 07XXXXXXXX
*/
export const isValidLocalPhoneNumber = (phone) => {
	return /^07\d{8}$/.test(phone);
};
