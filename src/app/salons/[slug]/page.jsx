export default function SalonDetails({ params }) {
  const { slug } = params;

  return (
    <div>
      <h1>Salon Details</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}
