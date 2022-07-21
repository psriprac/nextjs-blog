import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default function RichText(props) {

    return (
      <>
        {/* {documentToHtmlString(props.body)}<br/><br/><br/> */}
        {documentToReactComponents(props.body)}
      </>
    )
  }