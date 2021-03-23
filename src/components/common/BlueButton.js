import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';

const BlueButton = styled(Button)({
  background: 'linear-gradient(45deg, #8E2DE2 30%, #4A00E0 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
  color: 'white',
  padding: '0 10px',
  marginTop: '10px',
  width: '100%',
  height: 40,
});

export default BlueButton;
