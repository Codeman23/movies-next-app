interface ILink {
	_id: string;
	link: string;
	title: string;
}

interface IContentList {
	name: string;
	links: ILink[];
}
