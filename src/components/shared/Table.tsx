type TableProps = {
  headers: string[];
  children: React.ReactNode;
};

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-max w-full text-right">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-2 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
