const people = ['AJ', 'LM', 'RK'];
export default function Avatars({ label = '12 connections played today' }: { label?: string }) { return <div className="avatars"><div className="avatar-stack">{people.map((person, index) => <span key={person} className={`avatar a${index}`}>{person}</span>)}<span className="avatar plus">+12</span></div><span>{label}</span></div>; }
