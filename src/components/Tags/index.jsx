import TagItem from './TagItem';

function Tags({ tagList }) {
  return (
    <div className="post__tags">
      {tagList?.map((tag, i) => {
        if (tag.length) {
          return <TagItem key={i} text={tag} />
        } 
        return null;
      })}
    </div>
  );
}

export default Tags;
