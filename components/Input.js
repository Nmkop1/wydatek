
const Input = ({ label, type, id, value, placeholder, onChange, autoFocus }) => {
  return (
    <div className="flex flex-col space-y-1  ">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-textAccent">{label}</label>

      </div>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className="px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-textPrimary"
      />
    </div>
  );
};

export default Input;
