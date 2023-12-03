import { styled } from '..'

export const HeaderContainer = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  button: {
    border: 0,
    padding: 16,
    borderRadius: 8,
    display: 'flex',
    cursor: 'pointer',
    color: '$gray300',
    textAling: 'center',
    alignItems: 'center',
    background: '$gray800',
    position: 'relative',

    span: {
      position: 'absolute',
      top: -6,
      right: -6,
      borderRadius: '50%',
      border: '2px solid $gray900',
      backgroundColor: '$green300',
      color: '$white',
      padding: 6,
      lineHeight: 0.5,
    },

    '&:hover': {
      color: '$white',
    },
  },
})
