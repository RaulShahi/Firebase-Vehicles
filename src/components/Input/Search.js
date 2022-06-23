import React from "react";
const Search = ({ name, onSearch }) => {
  return (
    <form>
      <input
        type="text"
        name="text"
        className="form-control"
        placeholder="Search Models..."
        value={name}
        onChange={(event) => {
          onSearch(event);
        }}
      />
    </form>
  );
};

export default Search;
