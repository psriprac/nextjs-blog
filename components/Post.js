import RichText from "./RichText"
import Image from "next/image"

export default function Post(props) {
    let formatting = props.date.split('T')[0]
    const reorderDate = {...formatting.split('-')}
    const formatDate = [reorderDate[1], reorderDate[2], reorderDate[0]].join('/')

    return (
      <div>
        <h1>{props.title}</h1>
        { props.tags && (props.tags.map(x =>
          `#${x} `
        ))}
        <div>{formatDate}</div>
        { props.author && <h3>By {props.author}</h3>}
        { props.image && 
          <div className="w-full overflow-hidden h-[300px] relative">
            <Image src={props.image} alt={props.title} layout="fill" className="object-none"/>
          </div>
        }
        <RichText body={props.body} />

      </div>
    )
  }