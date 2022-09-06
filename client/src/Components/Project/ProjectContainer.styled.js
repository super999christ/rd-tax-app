//  External Dependencies
import styled from 'styled-components';

export const ProjectContainer = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 4px;

  padding: 10px 15px 10px 15px;

  border-radius: 5px;
  background-color: #fdeada;
  border: 3px solid #fac090;

  hr {
    border-top: 2px solid #fac090;
    margin: 5px 0px 5px 0px;
  }

  .hidden_pad {
    display: none !important;
  }

  .project_header {
    display: flex;
    flex-direction: row;
  }

  .project_header .titlePad {
    font-family: 'LibreFranklin';
    font-size: 20pt;
  }

  .project_header .buttonPad {
    margin-left: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .project_content {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .project_actions {
    display: flex;
    flex-direction: row;
    gap: 20px;

    align-items: center;
    justify-content: center;
  }

  .image-mr-2 {
    margin-right: 5px;
  }

  @media (max-width: 550px) {
    .responsive {
      display: none;
    }
  }
`;
