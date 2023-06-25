// layouts
import MainLayout from "../../layouts/MainLayout";


function PublicRoute({ element: Element, ...props }) {

  return (
    <MainLayout>
      <Element { ...props }/>
    </MainLayout>
  );
}

export default PublicRoute;