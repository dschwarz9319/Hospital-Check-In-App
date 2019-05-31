import pluralize from "./pluralize";
import titlecase from "./titlecase";

const entitytitle = string => pluralize(titlecase(string));

export default entitytitle;
