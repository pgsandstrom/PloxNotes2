import { querySingle, SQL, query } from "./util/db";
import { Note } from "types";
import { v4 as uuidv4 } from "uuid";

export const load = async (id: string) => {
  const queryResult = await querySingle<{ data: Note[] }>(
    SQL`SELECT data FROM note WHERE id = ${id}`
  );
  if (queryResult) {
    return queryResult;
  } else {
    return {
      data: [
        {
          id: uuidv4(),
          text: "",
          checked: false,
        },
      ],
    };
  }
};

export const save = async (id: string, notes: Note[]) => {
  const queryResult = await querySingle<Note[]>(
    SQL`SELECT data FROM note WHERE id = ${id}`
  );
  if (queryResult) {
    return query(
      SQL`UPDATE note SET data=${JSON.stringify(notes)}::jsonb WHERE id = ${id}`
    );
  } else {
    return query(SQL`INSERT INTO note(id, data) VALUES(${id}, ${notes})`);
  }
};