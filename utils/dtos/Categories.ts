type Category = {
	id: string;
	name: string;
	created_at: Date;
};

type ICreateCategory = {
	name: string;
};
type IUpdateCategory = {
	id: string;
	name: string;
};

export { Category, ICreateCategory, IUpdateCategory };
