import { Tag } from "#cds-models/Bouldering";

export default {
	formatTags: (tags: {tag: Tag}[]) => {
		return tags.map(tagWrapper => tagWrapper.tag.name).join(", ");
	}
};
