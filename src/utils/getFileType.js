export const getFileTypeEnum = (file) => {
	const ext = file.name.split('.').pop().toLowerCase();

    switch (ext) {
		case 'xlsx':
		case 'xls':
			return 1;
		case 'pdf':
			return 2;
		case 'jpg':
		case 'jpeg':
		case 'png':
			return 3;
		default:
			return null;
	}
};
