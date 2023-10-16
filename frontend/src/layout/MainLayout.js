import Header from "./header/Header";
import Community from "./community"
import About from './about'

export default function MainLayout(props) {
  return (
    <div>
      <Header />
      <div className="relative min-h-[calc(100vh-200px)] container mx-auto">{props.children}</div>
      <About />
      <Community />
    </div>
  );
}
