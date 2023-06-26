import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { CATEGORIES } from "../constant";

const CategorySelect = ({ category, setCategory }) => {
  const handleChange = (e) => {
    const category = e.target.value;
    setCategory(category);
  };
  return (
    <FormControl>
      <InputLabel>Category</InputLabel>
      <Select
        id="category-select"
        value={category}
        onChange={handleChange}
        label="Category"
        autoWidth
      >
        <MenuItem value={CATEGORIES.POPULAR}>Popular</MenuItem>
        <MenuItem value={CATEGORIES.NOW_PLAYING}>Now Playing</MenuItem>
        <MenuItem value={CATEGORIES.TOP_RATED}>Top Rated</MenuItem>
        <MenuItem value={CATEGORIES.UPCOMING}>Upcoming</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
