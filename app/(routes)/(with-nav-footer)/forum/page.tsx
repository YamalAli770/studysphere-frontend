import PostList from "./_components/PostList";

export default function Forum() {
  return (
    <>
      <div className="py-24">
        <div className="container">
            <div className="pb-24 flex justify-center">
            <PostList />
            </div>            
        </div>
      </div>
    </>
  )
}