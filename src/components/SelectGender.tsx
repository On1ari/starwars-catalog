import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

type GenderFilterSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

const SelectGender = ({ value, onChange }: GenderFilterSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] ">
        <SelectValue placeholder="Filter by gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="male">Male</SelectItem>
        <SelectItem value="female">Female</SelectItem>
        <SelectItem value="n/a">N/A</SelectItem>
        <SelectItem value="hermaphrodite">Hermaphrodite</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default SelectGender