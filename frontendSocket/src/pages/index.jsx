import Link from 'next/link'
export default function Home() {
    return (
      <div>
        <Link href={'/chat/admin'}>Send to admin</Link>
        <Link href={'/chat/user1'}>Send to user1</Link>
        <Link href={'/chat/user2'}>Send to user2</Link>
        <Link href={'/chat/user3'}>Send as user3</Link>
      </div>
    );
}