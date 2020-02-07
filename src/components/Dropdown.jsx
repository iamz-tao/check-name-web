import styled from 'styled-components'
import { Dropdown as SemanticDropdown } from 'semantic-ui-react'

const props = {
  compact: true,
  selection: true,
}

/**
 * https://react.semantic-ui.com/modules/dropdown/
 *
 * TODO: style correction, text flickering
 */
const Dropdown = styled(SemanticDropdown)
  .attrs(props)`
  &&&& {
    width: 100%;
    min-height: unset;

    padding-left: 12px;
    padding-top: 8px;
    padding-bottom: 8px;

    color: #231f20;
    font-family: 'Sarabun';

    i.icon {
      padding: 0;
      margin: 0;

      font-size: 20px;
      line-height: 0;

      top: 50%;
      right: 12px;
    }
  }
`

export default Dropdown
