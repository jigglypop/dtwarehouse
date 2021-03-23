import styled from 'styled-components';

export const SmallHeader = styled.div`
  text-align: center;
  .title {
    font-size: 30px;
    color: white;
    padding: 20px;
    text-shadow: 2px 2px 20px white;
    animation: blink 1.5s ease-in-out infinite alternate;

    @keyframes blink {
      50% {
        opacity: 0.1;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .description {
    font-size: 15px;
    color: white;
    padding: 20px;
  }
`;
