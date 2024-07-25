import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import NavBar from "../layouts/NavBar/NavBar";
import UserEdit from "../components/Users/User-Edit/UserEdit";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/NavBar">
                <NavBar/>
            </ComponentPreview>
            <ComponentPreview path="/UserEdit">
                <UserEdit/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews