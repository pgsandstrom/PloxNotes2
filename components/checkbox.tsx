interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <>
      <button onClick={() => onChange(!checked)} className={checked ? 'checked' : ''}>
        {checked ? (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="check-square"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            style={{ width: '32px' }}
          >
            <path
              fill="currentColor"
              d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z"
            ></path>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="square"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            style={{ width: '32px' }}
          >
            <path
              fill="currentColor"
              d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z"
            ></path>
          </svg>
        )}
        <style jsx>{`
          button {
            cursor: pointer;
            border: none;
            background: none;
            padding: 0px;
            outline: none;
          }
          button:focus {
            color: #129cd9;
          }
          button.checked:focus {
            color: #7c90e6;
          }
        `}</style>
      </button>
    </>
  )
}
