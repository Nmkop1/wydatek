

const Input = ({ label, type, id, value, placeholder, onChange, autoFocus }) => {
  return (
    <div className="flex flex-col space-y-1 my-3 ">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-niebieski-9">{label}</label>

      </div>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className="flex flex-1 px-4 py-2 transition duration-300 border bg-itemTlo border-niebieski-7 rounded   focus:bg-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-zielony-1"
      />
    </div>
  );
};

export default Input;
