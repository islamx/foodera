type TableProps = {
  headers: string[];
  children: React.ReactNode;
};

export default function Table({ headers, children }: TableProps) {
  return (
    <table className="w-full border text-right">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="p-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
