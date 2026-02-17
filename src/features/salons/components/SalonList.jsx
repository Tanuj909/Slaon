import Link from "next/link";

export default function SalonList({ salons }) {
  return (
    <div>
      {salons.map((salon) => (
        <div key={salon.id}>
          <Link href={`/salons/${salon.slug}`}>
            {salon.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
