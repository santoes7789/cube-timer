import { useDB } from "../../contexts/DBContext"

function TimeList() {

  const db = useDB();
  return (
    <>
      {db.times.map((e) =>
        <div key={e.id}>
          {e.getFormattedTimeValue()}
        </div>
      )}
    </>
  )

}

export default TimeList;
