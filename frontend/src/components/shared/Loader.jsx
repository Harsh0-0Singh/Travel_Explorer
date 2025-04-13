import React from "react";
import styled, { css, keyframes } from "styled-components";

// Factory function to create keyframes for different delays
const createPageFlip = (delay) => keyframes`
  ${0 + delay}% {
    transform: rotateY(180deg);
    opacity: 0;
  }
  ${20 + delay}% {
    opacity: 1;
  }
  ${35 + delay}%,
  100% {
    opacity: 0;
  }
  ${50 + delay}%,
  100% {
    transform: rotateY(0deg);
  }
`;

// Transient props (start with $) are not passed to DOM
const Page = styled.li`
  position: absolute;
  top: 10px;
  left: 10px;
  transform-origin: 100% 50%;
  color: ${(props) => props.$color};
  opacity: ${(props) => props.$opacity};
  transform: rotateY(${(props) => props.$rotate});

  svg {
    width: 90px;
    height: 120px;
    display: block;
  }

  ${(props) =>
    props.$animate &&
    css`
      animation: ${createPageFlip(props.$delay)} var(--duration) ease infinite;
    `}
`;

const LoaderWrapper = styled.div`
  width: 200px;
  height: 140px;
  position: relative;
  --background: linear-gradient(135deg, #23C4F8, #275efe);
  --shadow: rgba(39, 94, 254, 0.28);
  --text: #6c7486;
  --page: rgba(255, 255, 255, 0.36);
  --page-fold: rgba(255, 255, 255, 0.52);
  --duration: 3s;

  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: 8px;
    width: 120px;
    top: 80%;
    box-shadow: 0 16px 12px var(--shadow);
    transform: rotate(-6deg);
  }

  &::after {
    transform: rotate(6deg);
    right: 4px;
  }

  &::before {
    left: 4px;
  }
`;

const Book = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 13px;
  position: relative;
  z-index: 1;
  perspective: 600px;
  box-shadow: 0 4px 6px var(--shadow);
  background-image: var(--background);
`;

const PageList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
`;

const LoadingText = styled.span`
  display: block;
  left: 0;
  right: 0;
  top: 100%;
  margin-top: 20px;
  text-align: center;
  color: var(--text);
`;

const Loader = () => {
  const pages = Array.from({ length: 6 }, (_, i) => i);

  return (
    <LoaderWrapper>
      <Book>
        <PageList>
          {pages.map((_, i) => (
            <Page
              key={i}
              $rotate={i === 0 ? "0deg" : "180deg"}
              $opacity={i === 0 || i === pages.length - 1 ? 1 : 0}
              $color={i < 2 ? "var(--page)" : "var(--page-fold)"}
              $animate={i >= 2 && i < 6}
              $delay={(i * 15) - 30}
            >
              <svg viewBox="0 0 90 120" fill="currentColor">
                <path d="M90,0 L90,120 L11,120 C4.92,120 0,115.08 0,109 L0,11 C0,4.92 4.92,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.12,81 16,82.12 16,83.5 C16,84.83 17.03,85.91 18.34,85.99 L18.5,86 L71.5,86 C72.88,86 74,84.88 74,83.5 C74,82.17 72.97,81.09 71.66,81.01 L71.5,81 Z M71.5,57 L18.5,57 C17.12,57 16,58.12 16,59.5 C16,60.83 17.03,61.91 18.34,61.99 L18.5,62 L71.5,62 C72.88,62 74,60.88 74,59.5 C74,58.12 72.88,57 71.5,57 Z M71.5,33 L18.5,33 C17.12,33 16,34.12 16,35.5 C16,36.83 17.03,37.91 18.34,37.99 L18.5,38 L71.5,38 C72.88,38 74,36.88 74,35.5 C74,34.12 72.88,33 71.5,33 Z" />
              </svg>
            </Page>
          ))}
        </PageList>
      </Book>
      <LoadingText>Loading</LoadingText>
    </LoaderWrapper>
  );
};

export default Loader;
