"use client";

import React from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)"
}) => {
  // Add the spotlight effect to button children
  const enhanceChildren = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, (child) => {
      // Check if the child is a React element
      if (!React.isValidElement(child)) {
        return child;
      }

      // If it's a button element, apply spotlight effect
      if (child.type === 'button' ||
          (typeof child.type === 'string' && child.type.toLowerCase() === 'button') ||
          (typeof child.type === 'function' && child.type.name?.includes('Button'))) {

        return React.cloneElement(child, {
          ...child.props,
          className: `spotlight-button ${child.props.className || ''}`,
          onMouseMove: (e: React.MouseEvent) => {
            const button = e.currentTarget;
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);

            // Call the original onMouseMove if it exists
            if (child.props.onMouseMove) {
              child.props.onMouseMove(e);
            }
          },
          onMouseEnter: (e: React.MouseEvent) => {
            e.currentTarget.classList.add('spotlight-active');

            // Call the original onMouseEnter if it exists
            if (child.props.onMouseEnter) {
              child.props.onMouseEnter(e);
            }
          },
          onMouseLeave: (e: React.MouseEvent) => {
            e.currentTarget.classList.remove('spotlight-active');

            // Call the original onMouseLeave if it exists
            if (child.props.onMouseLeave) {
              child.props.onMouseLeave(e);
            }
          },
        });
      }

      // If it's not a button but has children, recursively process them
      if (child.props && child.props.children) {
        return React.cloneElement(child, {
          ...child.props,
          children: enhanceChildren(child.props.children)
        });
      }

      return child;
    });
  };

  return (
    <div className={className}>
      <style jsx global>{`
        .spotlight-button {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }
        .spotlight-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          background: radial-gradient(circle at var(--x) var(--y), ${spotlightColor}, transparent 80%);
          z-index: 1;
          border-radius: inherit;
        }
        .spotlight-button.spotlight-active::after {
          opacity: 1;
        }
        .spotlight-button > * {
          position: relative;
          z-index: 2;
        }
      `}</style>
      {enhanceChildren(children)}
    </div>
  );
};

export default SpotlightCard;
