import React from 'react'
import clsx from 'clsx'

export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20'

const DiceIcon: React.FC<{
  className?: string
  dieType?: DieType
  size?: 'xs' | 'sm' | 'md' | 'lg'
}> = ({ dieType, size }) => {
  const paths: Record<DieType | 'dx', string> = {
    d4: 'M235.11 196.24l17.074-29.463v29.463H235.11zM486.95 456H25.05L256 56zm-358.631-54.833l41.212-22.943-6.702-12.075-59.699 33.303 5.458 9.805a11.278 11.278 0 0 1 2.645-.881 11.822 11.822 0 0 1 5.566-.085 12.534 12.534 0 0 1 6.34 4.01 59.3 59.3 0 0 1 5.071 7.353l7.994-4.456zM273.074 196.24h-7.74v-42.734H250.24l-25.14 41.515v11.749h27.072v14.72h13.162v-14.72h7.74v-10.518zm131.619 212.45q6.822-11.93.616-21.735-3.26-5.132-10.675-9.745l-6.484 11.338a22.677 22.677 0 0 1 6.533 5.483q2.873 4.19-.17 9.515a8.453 8.453 0 0 1-5.916 4.552 10.868 10.868 0 0 1-7.463-1.497 14.08 14.08 0 0 1-6.436-8.513 99.728 99.728 0 0 1-2.294-15.167q-1.316-13.089-5.82-18.982a32.144 32.144 0 0 0-10.095-9.418l-23.28 40.705 10.275 5.88 14.828-25.913a15.203 15.203 0 0 1 1.679 4.577q.47 2.415 1.062 8.585l.64 6.57a45.149 45.149 0 0 0 2.717 12.823 21.518 21.518 0 0 0 9.455 10.638q8.598 4.915 17.002 2.33 8.404-2.584 13.814-12.014z',
    d6: 'M255.703 44.764c-6.176 0-12.353 1.384-17.137 4.152l-152.752 88.36c-9.57 5.535-9.57 14.29 0 19.826l152.752 88.359c9.57 5.536 24.703 5.536 34.272 0l152.754-88.36c9.57-5.534 9.57-14.289 0-19.824L272.838 48.916c-4.785-2.77-10.96-4.152-17.135-4.152zM238.695 87.27l22.838 14.273c-6.747 1.007-12.586 2.28-17.515 3.818-4.985 1.504-9.272 3.334-12.864 5.489-7.721 4.633-11.09 9.897-10.105 15.793.93 5.86 6.223 12.247 15.875 19.16.26-3.467 1.457-6.652 3.59-9.553 2.077-2.936 5.159-5.629 9.244-8.08 10.28-6.168 22.259-8.83 35.935-7.98 13.722.821 26.568 4.973 38.537 12.455 13.239 8.274 20.334 17.024 21.284 26.251.894 9.194-4.584 17.346-16.436 24.458-13.064 7.838-28.593 10.533-46.588 8.085-18.004-2.508-36.964-9.986-56.877-22.431-20.41-12.756-32.258-25.276-35.547-37.56-3.299-12.347 2.348-22.895 16.938-31.65 4.624-2.774 9.554-5.192 14.79-7.253 5.238-2.061 10.871-3.82 16.901-5.275zm38.678 53.23c-4.169-.007-7.972 1.02-11.406 3.08-4.534 2.72-6.125 5.906-4.774 9.555 1.341 3.587 5.624 7.64 12.85 12.156 7.226 4.516 13.78 7.237 19.666 8.166 5.875.867 11.081-.059 15.615-2.78 4.58-2.747 6.198-5.915 4.858-9.503-1.351-3.65-5.64-7.732-12.866-12.248-7.226-4.516-13.777-7.207-19.652-8.074a27.826 27.826 0 0 0-4.291-.352zm158.494 33.314c-1.938.074-4.218.858-6.955 2.413l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.699c0 11.05 7.57 15.419 17.14 9.89l146.937-84.843c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c-2.497-8.048-5.23-12.495-10.184-12.308zm-359.763.48c-6.227 0-10.033 5.325-10.155 11.825v157.697c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.141 1.156 17.141-9.895v-157.7c0-11.051-7.57-24.159-17.14-29.687L83.09 176.225c-2.567-1.338-4.911-1.93-6.986-1.93zm40.095 52.226l68.114 40.869v25.287l-46.262-27.758v20.64a43.279 43.279 0 0 1 6.262 2.151c2.135.864 4.341 1.98 6.619 3.346 12.953 7.772 23.037 17.902 30.25 30.39 7.212 12.43 10.818 25.912 10.818 40.448 0 14.416-3.938 23.342-11.814 26.777-7.83 3.464-18.72 1.01-32.67-7.36-6.026-3.615-12.005-7.948-17.936-12.996-5.884-4.96-11.744-10.68-17.58-17.16v-27.076c5.789 7.643 11.27 14.06 16.441 19.248 5.22 5.217 10.13 9.205 14.733 11.967 6.643 3.986 11.862 5.092 15.658 3.318 3.843-1.804 5.766-6.19 5.766-13.16 0-7.03-1.923-13.723-5.766-20.08-3.796-6.328-9.015-11.485-15.658-15.47a56.585 56.585 0 0 0-12.598-5.594c-4.46-1.426-9.252-2.335-14.377-2.729V226.52zm270.047 5.732v85.809L400 309.809v25.414l-13.754 8.252v24.777l-23.502 14.102v-24.778L320 383.223v-30.06l38.611-104.331 27.635-16.58zm-23.502 42.978l-27.248 73.28 27.248-16.348V275.23z',
    d8: 'M256 37.143L77.896 343.853h356.208zM230.154 49.79L72 164.233v157.91zm51.69 0L440 322.144V164.232zm-132.516 90.02v21.786l-8.486 9.68v-16.942c-2.772 3.24-5.692 6.367-8.385 9.664 3.536.293 2.484 5.43 2.207 7.752-1.746 9.536-8.154 17.575-13.404 24.79-1.943 2.544-3.943 5.075-6.008 7.507-4.65 3.4-8.49 4.39-10.775-1.463.294-7.806 3.84-15.22 8.046-20.967l5.288-7.918c-.048 2.462.1 4.97-.072 7.405-2.34 4.347-6.766 9.46-5.758 14.608 7.76.874 12.22-10.863 14.522-16.58.832-2.76 2.108-5.458-1.418-5.434v-7.264zm212.13 1.21l44.853 54.464v7.262l-30.304-36.31v8.472l-6.06-7.262c-.155-4.15-1.424-8.377-2.425-12.103-1.86-2.936-3.96-5.704-6.06-8.47zM256.07 203.86c8.37 0 14.733 1.53 19.088 4.587 4.355 3.027 6.533 7.475 6.533 13.344 0 3.924-1.08 7.198-3.243 9.823-2.13 2.626-5.297 4.572-9.498 5.838 4.694 1.298 8.23 3.415 10.61 6.35 2.408 2.902 3.614 6.576 3.614 11.024 0 6.857-2.286 12.047-6.858 15.57-4.54 3.49-11.288 5.233-20.246 5.233-8.988 0-15.784-1.744-20.386-5.234-4.572-3.522-6.858-8.712-6.858-15.57 0-4.447 1.19-8.12 3.57-11.024 2.408-2.935 5.96-5.052 10.655-6.35-4.2-1.265-7.366-3.21-9.497-5.837-2.13-2.625-3.198-5.9-3.198-9.822 0-5.837 2.18-10.285 6.534-13.343 4.354-3.058 10.748-4.586 19.18-4.586zm0 11.212c-2.84 0-5.035.742-6.58 2.225-1.513 1.482-2.27 3.583-2.27 6.3 0 2.75.757 4.866 2.27 6.348 1.545 1.483 3.74 2.225 6.58 2.225 2.78 0 4.926-.742 6.44-2.225 1.513-1.482 2.27-3.598 2.27-6.347 0-2.75-.757-4.85-2.27-6.3-1.514-1.484-3.66-2.226-6.44-2.226zm0 28.262c-3.336 0-5.9.912-7.69 2.734-1.793 1.823-2.69 4.433-2.69 7.83 0 3.398.897 6.008 2.69 7.83 1.79 1.792 4.354 2.688 7.69 2.688 3.305 0 5.837-.896 7.598-2.687 1.76-1.824 2.64-4.434 2.64-7.832 0-3.428-.88-6.038-2.64-7.83-1.76-1.822-4.293-2.734-7.598-2.734zM88.7 359.852L256 480.912l167.3-121.06zm139.42 23.23h54.548v4.842c-14.406 5.942-21.582 12.897-27.88 25.416h-15.76c7.104-13.803 14.546-17.714 26.67-25.416h-37.58z',
    d10: 'M375.483 251.243l-109.98 51.138.213 183.381L477.01 266.346l-86.993-21.81zm-12.736 108.626l-5.947 14.699-48.604-8.955 5.007-12.832a141.306 141.306 0 0 0 13.51-11.358 167.184 167.184 0 0 0 16.566-17.517 170.478 170.478 0 0 0 12.606-17.958 115.607 115.607 0 0 0 9.514-17.97l14.068 2.51q-9.37 22.334-30.361 44.43-13.296 13.64-20.645 18.636zM121.603 244.334l-84.71 21.763L246.474 486V302.38l-109.946-51.137zm19.147 50.852a28.72 28.72 0 0 1 24.273 6.802 53.052 53.052 0 0 1 11.226 14.188l-13.081 2.676a28.542 28.542 0 0 0-5.388-7.374q-5.185-4.876-11.262-3.853l-.487.095a6.458 6.458 0 0 0-5.162 4.448c-.856 2.378-.238 5.554 1.796 9.371q4.08 7.6 10.81 9.027a23.785 23.785 0 0 0 8.563-.203l1.867-.344 5.791 10.822q-6.398 1.427-8.23 3.282-3.21 3.14.429 9.93a17.042 17.042 0 0 0 6.089 6.696 10.406 10.406 0 0 0 7.385 1.534l.416-.083q4.757-.964 5.079-4.757c.261-2.57-.655-5.744-2.748-9.514l12.38-2.545a49.247 49.247 0 0 1 4.103 11.226 19.956 19.956 0 0 1-.642 9.383 11.702 11.702 0 0 1-3.96 5.411 19.575 19.575 0 0 1-8.027 3.235l-1.19.214a27.971 27.971 0 0 1-17.494-2.7 32.193 32.193 0 0 1-14.128-14.092q-3.627-6.79-2.604-12.19a8.396 8.396 0 0 1 2.521-4.947h-.071q-1.844.31-7.04-2.497a32.11 32.11 0 0 1-12.916-13.593q-5.245-9.764-3.282-18.398 1.962-8.634 13.676-11zM27.19 248.865l108.78-116.309a7.135 7.135 0 0 1 1.427 0h.154q3.14.345 2.842 3.71a19.36 19.36 0 0 1-3.294 8.1 39.376 39.376 0 0 1-9.728 10.405q-3.912 2.938-15.044 9.514-12.796 7.505-19.55 14.77a92.535 92.535 0 0 0-11.513 14.486l32.907 3.758 8.182-12.963-20.967-2.378a36.415 36.415 0 0 1 4.757-3.83q2.379-1.605 8.444-5.125l6.422-3.747a92.975 92.975 0 0 0 12.903-8.776 61.472 61.472 0 0 0 12.51-14.414q6.84-10.846 6.494-17.957c-.19-3.949-2.105-6.434-5.684-7.505l79.798-85.161-102.097 179.576-5.708 10.06zm367.238-71.974q-3.817-5.458-3.758-8.515c0-2.033 1.19-3.199 3.568-3.448h.57a11.892 11.892 0 0 1 6.91 2.247 29.85 29.85 0 0 1 7.837 8.051q3.687 5.28 3.71 8.397c0 2.093-1.188 3.258-3.496 3.567h-.594a11.75 11.75 0 0 1-6.957-2.378 29.79 29.79 0 0 1-7.79-7.885zm-109.41-141.52l83.948 89.634h-1.189c-.38 0-.975 0-1.463.107q-7.825.892-8.324 6.862-.5 5.97 5.03 13.747a53.778 53.778 0 0 0 6.375 7.374 37.901 37.901 0 0 0 10.144 6.897q-2.117 2.89-.702 7.98a37.283 37.283 0 0 0 5.613 11.096 55.122 55.122 0 0 0 15.223 14.806q8.098 5.268 16.066 4.935.81 0 1.618-.13 8.776-.988 9.228-7.873a16.114 16.114 0 0 0-.463-4.853l58.689 62.686-91.572-22.941-6.1-10.703zm98.22 104.927l2.45 2.617c.451.57.903 1.189 1.355 1.784 1.808 2.592 2.723 4.757 2.723 6.529 0 1.771-1.034 2.782-3.127 3.02h-.512a10.346 10.346 0 0 1-6.077-1.95 22.596 22.596 0 0 1-6.184-6.137c-1.974-2.83-2.937-5.102-2.878-6.814.06-1.713 1.118-2.7 3.187-2.937h.524a10.263 10.263 0 0 1 6.005 1.879 19.147 19.147 0 0 1 2.533 2.01zM255.987 26L137.456 231.026l118.532 55.05 118.604-55.05zm-1.19 208.463q-17.529 0-24.58-12.273-7.053-12.273-7.053-34.988 0-22.714 7.052-35.047 7.052-12.332 24.582-12.344 17.53 0 24.582 12.332 7.052 12.333 7.052 35.047 0 22.715-7.052 34.988-7.053 12.273-24.582 12.285zm10.538-71.807q2.497 7.968 2.497 24.546 0 15.817-2.497 24.201-2.498 8.384-10.537 8.325-8.04 0-10.632-8.325-2.593-8.324-2.593-24.2 0-16.579 2.593-24.547t10.632-7.968q8.015-.012 10.513 7.956z',
    d12: 'M450.169 181.354L379.685 84.29 265.629 47.325v92.652l96.384 70.031zm-91.46-28.416a19.735 19.735 0 0 1-3.004 6.606 16.563 16.563 0 0 1-11.924 6.857q-7.548.918-15.729-5.056-8.18-5.974-9.599-13.439a16.563 16.563 0 0 1 2.922-13.414 19.747 19.747 0 0 1 5.378-4.866q3.422-2.206 9.026-1.574a18.757 18.757 0 0 1-1.717-10.421 21.082 21.082 0 0 1 4.03-9.802 19.246 19.246 0 0 1 13.666-7.99q8.633-1.108 17.779 5.57 9.146 6.677 10.326 14.952a20.033 20.033 0 0 1-3.827 15.204 20.772 20.772 0 0 1-8.145 6.797 16.312 16.312 0 0 1-10.17 1.192q2.038 5.461.989 9.384zm-10.731-8.287a8.252 8.252 0 0 1-1.717 6.189 8.907 8.907 0 0 1-15.669-3.685 8.562 8.562 0 0 1 1.908-6.367 8.347 8.347 0 0 1 5.33-3.578 8.252 8.252 0 0 1 6.451 1.825 8.347 8.347 0 0 1 3.757 5.628zm9.54-11.77a10.732 10.732 0 0 1-11.472-8.346q-.548-3.709 2.504-7.894a10.851 10.851 0 0 1 6.654-4.77 10.732 10.732 0 0 1 11.543 8.43 10.851 10.851 0 0 1-2.469 7.775q-2.945 4.198-6.653 4.806zm-110.968 7.096V47.325L132.494 84.29 62.01 181.354l88.156 28.618zm-112.66-21.798l37.895-26.52a31.73 31.73 0 0 1 5.056 12.664q1.55 7.155-2.79 19.413a98.304 98.304 0 0 0-4.341 14.524 13.904 13.904 0 0 0 2.158 10.314 10.732 10.732 0 0 0 6.034 4.472 8.347 8.347 0 0 0 7.154-1.574q4.961-3.47 4.162-8.43a22.418 22.418 0 0 0-3.577-7.644l10.577-7.393q4.674 7.25 5.425 13.2 1.443 11.328-9.682 19.079-8.789 6.153-17.386 4.913-8.597-1.24-14.214-9.242a21.237 21.237 0 0 1-3.97-13.486 44.513 44.513 0 0 1 3.112-12.568l2.194-6.141q2.063-5.76 2.659-8.12a15.025 15.025 0 0 0 .43-4.77l-24.16 16.908zm64.7 215.412h114.998l35.51-109.37-93.009-67.598-93.009 67.599zm89.266-95.072a8.347 8.347 0 0 0-6.797-2.838q-6.058 0-8.24 4.52a22.382 22.382 0 0 0-1.49 8.346h-12.855q.322-8.62 3.124-13.927 5.319-10.112 18.889-10.112 10.731 0 17.063 5.962 6.332 5.962 6.237 15.633a21.25 21.25 0 0 1-4.484 13.32 44.585 44.585 0 0 1-9.659 8.62l-5.318 3.769q-4.996 3.577-6.832 5.127a15 15 0 0 0-3.1 3.685h29.488v11.685h-46.207a31.73 31.73 0 0 1 3.125-13.271q2.838-6.75 13.414-14.31a98.602 98.602 0 0 0 11.925-9.408 13.916 13.916 0 0 0 4.15-9.682 10.732 10.732 0 0 0-2.433-7.13zm-79.607-1.812a58.536 58.536 0 0 0 8.776-.835 12.377 12.377 0 0 0 6.511-3.577 11.686 11.686 0 0 0 2.6-4.842 11.125 11.125 0 0 0 .512-2.707h11.09v67.54h-13.606v-46.553H208.25v-9.038zM196.468 352.67l-54.434 75.04 114.055 36.965 114.056-36.965-54.434-75.04H196.468zm77.27 83.792q-5.64 7.226-17.517 7.214-12.76 0-18.817-10.672-4.71-8.347-4.71-21.464a97.78 97.78 0 0 1 .656-12.58 38.444 38.444 0 0 1 4.52-14.309 23.121 23.121 0 0 1 7.571-7.87 20.414 20.414 0 0 1 11.197-2.981q9.408 0 15 4.77a18.328 18.328 0 0 1 6.285 12.83h-13.165a6.773 6.773 0 0 0-1.252-3.577 7.286 7.286 0 0 0-6.475-3.172q-6.474 0-9.217 7.262a45.062 45.062 0 0 0-2.051 11.829 14.905 14.905 0 0 1 5.724-4.281 20.975 20.975 0 0 1 22.19 4.77 21.833 21.833 0 0 1 5.748 15.609 26.34 26.34 0 0 1-5.64 16.61zm-10.732-24.612q2.885 3.148 2.885 9.063a13.868 13.868 0 0 1-2.54 8.645 8.275 8.275 0 0 1-6.963 3.327 9.36 9.36 0 0 1-7.453-3.446 13.248 13.248 0 0 1-2.862-8.884q0-6.75 3.911-9.778a9.456 9.456 0 0 1 5.962-2.05 9.241 9.241 0 0 1 7.131 3.111zm119.147-112.195l27.879 8.347-4.77 16.157zm-14.31-71.546l-36.81 113.28 54.483 74.993L456 319.366V199.503zm66.073 86.952l-13.927-4.162-7.656 25.614-11.113-3.315-32.196-35.523 4.27-14.309 40.434 12.08 2.183-7.322 9.956 2.97-2.182 7.32 13.928 4.162zm-289.76-86.952L56 199.491v119.934l70.484 97.016 54.482-74.992zM72.54 286.24l44.43-14-4.77-15.143 8.621-2.719a58.536 58.536 0 0 0 3.435 8.12 12.377 12.377 0 0 0 5.33 5.14 11.686 11.686 0 0 0 5.401 1.026 11.137 11.137 0 0 0 2.731-.322l3.327 10.576-64.391 20.272zm18.47 58.596l-4.09-12.974 44.43-13.999-4.77-15.144 8.622-2.718a58.68 58.68 0 0 0 3.434 8.12 12.365 12.365 0 0 0 5.33 5.14 11.65 11.65 0 0 0 5.402 1.025 11.102 11.102 0 0 0 2.73-.322l3.328 10.577z',
    d20: 'M248 20.3L72.33 132.6 248 128.8zm16 0v108.5l175.7 3.8zm51.4 58.9c6.1 3.5 8.2 7.2 15.1 4.2 10.7.8 22.3 5.8 27.6 15.7 4.7 4.5 1.5 12.6-5.2 12.6-9.7.1-19.7-6.1-14.6-8.3 4.7-2 14.7.9 10-5.5-3.6-4.5-11-7.8-16.3-5.9-1.6 6.8-9.4 4-12-.7-2.3-5.8-9.1-8.2-15-7.9-6.1 2.7 1.6 8.8 5.3 9.9 7.9 2.2.2 7.5-4.1 5.1-4.2-2.4-15-9.6-13.5-18.3 5.8-7.39 15.8-4.62 22.7-.9zm-108.5-3.5c5.5.5 12.3 3 10.2 9.9-4.3 7-9.8 13.1-18.1 14.8-6.5 3.4-14.9 4.4-21.6 1.9-3.7-2.3-13.5-9.3-14.9-3.4-2.1 14.8.7 13.1-11.1 17.8V92.3c9.9-3.9 21.1-4.5 30.3 1.3 8 4.2 19.4 1.5 24.2-5.7 1.4-6.5-8.1-4.6-12.2-3.4-2.7-8.2 7.9-7.5 13.2-8.8zm35 69.2L55.39 149l71.21 192.9zm28.2 0l115.3 197L456.6 149zm-14.1 7.5L138.9 352.6h234.2zm133.3 21.1c13.9 8.3 21.5 26.2 22.1 43-1.3 13.6-.7 19.8-15.2 21.4-14.5 1.6-23.9-19.2-29.7-32.6-3.4-9.9-5.8-24 1.7-31.3 6.1-4.8 15-4.1 21.1-.5zm-223.7 16.1c2.1 4-.5 11.4-4.8 12.1-4.9.7-3.8-9.3-9.4-11.6-6.9-2.3-13.6 5.6-15 11.6 10.4-4 20.3 7.1 20.3 17-.4 11.7-7.9 24.8-19.7 28.1h-5.6c-12.7-.7-18.3-15.8-14.2-26.6 4.4-15.8 10.8-33.9 27.2-40.6 8.5-3.9 19 3.2 21.2 10zm213.9-8.4c-7.1-.1-4.4 10-3.3 14.5 3.5 11.5 7.3 26.6 18.9 30 6.8-1.2 4.4-12.8 3.7-16.5-4.7-10.9-7.1-23.3-19.3-28zM52 186v173.2l61.9-5.7zm408 0l-61.9 167.5 61.9 5.7zm-117.9.7l28.5 63.5-10 4.4-20-43.3c-6.1 3-13 8.9-14.6-1.4-1.3-3.9 8.5-5.1 8.1-11.9-.3-6.9 2.2-12.2 8-11.3zm-212 27.4c-2.4 5.1-4.1 10.3-2.7 15.9 1.7 8.8 13.5 6.4 15.6-.8 2.7-5 3.9-11.7-.5-15.7-4.1-3.4-8.9-2.8-12.4.6zm328.4 41.6c-.1 18.6 1.1 39.2-9.7 55.3-.9 1.2-2.2 1.9-3.7 2.5-5.8-4.1-3-11.3 1.2-15.5 1 7.3 5.5-2.9 6.6-5.6 1.3-3.2 3.6-17.7-1-10.2.7 4-6.8 13.1-9.3 8.1-5-14.4 0-30.5 7-43.5 5.7-6.2 9.9 4.4 8.9 8.9zM59.93 245.5c.59.1 1.34 1 2.48 3.6v61.1c-7.3-7-4.47-18-4.45-26.4 0-8.4 1.65-16.3-1.28-23.2-4.62-1.7-5.79-17-3.17-12.7 4.41 4.8 4.66-2.7 6.42-2.4zm178.77 7.6c8.1 4.5 13.8 14.4 10.8 23.6-2.1 15.2-27 21.1-30.4 29.7-1.2 3 25.4 1.6 30.2 1.6.5 4 1.5 10.7-3.8 11.7-14.5-1.2-29.9-.6-45.1-.6.4-11.2 7.4-21.3 17-26.8 6.9-4.9 15.4-9.3 18.1-17.9 1.8-4.5-.6-9.3-4.6-11.5-4.2-2.9-11-2.3-13.2 2.7-2 3.8-4.4 9.1-8.7 9.6-2.9.4-9 .5-7.2-4.9 1.4-5.6 3.4-11.5 8.2-15.2 8.8-6.3 19.9-6.7 28.7-2zm53.3-1.4c6.8 2.2 12 7.9 14.3 14.6 6.1 14.7 5.5 33.1-4.4 45.9-4.5 4.8-10.2 9.1-17 9.1-12.5-.1-22.4-11.1-24.8-22.8-3.1-13.4-1.8-28.7 6.9-39.8 6.8-7.6 16-10.3 25-7zm156.1 8.1c-1.6 5.9-3.3 13.4-.7 19.3 5.1-2 5.4-9.6 6.6-14.5.9-6.1-3.5-12.6-5.9-4.8zm-176.2 21.1c.6 10.5 1.7 22.8 9.7 28.2 4.9 1.8 9.7-2.2 11.1-6.7 1.9-6.3 2.3-12.9 2.4-19.4-.2-7.1-1.5-15-6.7-20.1-12.2-4.4-15.3 10.9-16.5 18zM434 266.8V328l-4.4 6.7v-42.3c-4.6 7.5-9.1 9.1-6.1-.9 6.1-7.1 4.8-17.4 10.5-24.7zM83.85 279c.8 3.6 5.12 17.8 2.04 14.8-1.97-1.3-3.62-4.9-3.41-6.1-1.55-3-2.96-6.1-4.21-9.2-2.95 4-3.96 8.3-3.14 13.4.2-1.6 1.18-2.3 3.39-.7 7.84 12.6 12.17 29.1 7.29 43.5l-2.22 1.1c-10.36-5.8-11.4-19.4-13.43-30-1.55-12.3-.79-24.7 2.3-36.7 5.2-3.8 9.16 5.4 11.39 9.9zm-7.05 20.2c-4.06 4.7-2.26 12.8-.38 18.4 1.11 5.5 6.92 10.2 6.06 1.6.69-11.1-2.33-12.7-5.68-20zm66.4 69.4L256 491.7l112.8-123.1zm-21.4.3l-53.84 4.9 64.24 41.1c-2.6-2.7-4.9-5.7-7.1-8.8-5.2-6.9-10.5-13.6-18.9-16.6-8.75-6.5-4.2-5.3 2.9-2.6-1-1.8-.7-2.6.1-2.6 2.2-.2 8.4 4.2 9.8 6.3l24.7 31.6 65.1 41.7zm268.4 0l-42.4 46.3c6.4-3.1 11.3-8.5 17-12.4 2.4-1.4 3.7-1.9 4.3-1.9 2.1 0-5.4 7.1-7.7 10.3-9.4 9.8-16 23-28.6 29.1l18.9-24.5c-2.3 1.3-6 3.2-8.2 4.1l-40.3 44 74.5-47.6c5.4-6.7 1.9-5.6-5.7-.9l-11.4 6c11.4-13.7 30.8-28.3 40-35.6 9.2-7.3 15.9-9.8 8.2-1.5l-12.6 16c10-7.6.9 3.9-4.5 5.5-.7 1-1.4 2-2.2 2.9l54.5-34.9zM236 385.8v43.4h-13.4v-30c-5-1.4-10.4 1.7-15.3-.3-3.8-2.9 1-6.8 4.5-5.9 3.3-.1 7.6.2 9.3-3.2 4.4-4.5 9.6-4.4 14.9-4zm29 .5c12.1 1.2 24.2.6 36.6.6 1.5 3 .8 7.8-3.3 7.9-7.7.3-21-1.6-25.9.6-8.2 10.5 5.7 3.8 11.4 5.2 7 1.1 15 2.9 19.1 9.2 2.1 3.1 2.7 7.3.7 10.7-5.8 6.8-17 11.5-25.3 10.9-7.3-.6-15.6-1.1-20.6-7.1-6.4-10.6 10.5-6.7 12.2-3.2 6 5.3 20.3 1.9 20.7-4.7.6-4.2-2.1-6.3-6.9-7.8-4.8-1.5-12.6 1-17.3 1.8-4.7.8-9.6.5-9-4.4.8-4.2 2.7-8.1 2.7-12.5.1-3 1.7-7 4.9-7.2zm133.5 5c-.2-.2-7 5.8-9.9 8.1l-15.8 13.1c10.6-6.5 19.3-12 25.7-21.2zm-247 14.2c2.4 0 7.5 4.6 9.4 7l26.1 31.1c-7.7-2.1-13.3-7.1-17.6-13.7-6.5-7.3-11.3-16.6-21.2-19.6-9-5-5.2-6.4 2.1-2.2-.3-1.9.2-2.6 1.2-2.6z',
    dx: 'M255.76 44.764c-6.176 0-12.353 1.384-17.137 4.152L85.87 137.276c-9.57 5.536-9.57 14.29 0 19.826l152.753 88.36c9.57 5.536 24.703 5.536 34.272 0l152.753-88.36c9.57-5.535 9.57-14.29 0-19.825l-152.753-88.36c-4.785-2.77-10.96-4.153-17.135-4.153zm-.824 53.11c9.013.097 17.117 2.162 24.31 6.192 4.92 2.758 8.143 5.903 9.666 9.438 1.473 3.507 1.56 8.13.26 13.865l-1.6 5.706c-1.06 4.083-1.28 7.02-.66 8.81.57 1.764 1.983 3.278 4.242 4.544l3.39 1.898-33.235 18.62-3.693-2.067c-4.118-2.306-6.744-4.912-7.883-7.82-1.188-2.935-.99-7.603.594-14.005l1.524-5.748c.887-3.423.973-6.23.26-8.418-.653-2.224-2.134-3.983-4.444-5.277-3.515-1.97-7.726-2.676-12.63-2.123-4.956.526-10.072 2.268-15.35 5.225-4.972 2.785-9.487 6.272-13.55 10.46-4.112 4.162-7.64 8.924-10.587 14.288L171.9 138.21c5.318-5.34 10.543-10.01 15.676-14.013 5.134-4 10.554-7.6 16.262-10.8 14.976-8.39 28.903-13.38 41.78-14.967 3.208-.404 6.315-.59 9.32-.557zm50.757 56.7l26.815 15.024-33.235 18.62-26.816-15.023 33.236-18.62zM75.67 173.84c-5.753-.155-9.664 4.336-9.664 12.28v157.696c0 11.052 7.57 24.163 17.14 29.69l146.93 84.848c9.57 5.526 17.14 1.156 17.14-9.895V290.76c0-11.052-7.57-24.16-17.14-29.688l-146.93-84.847c-2.69-1.555-5.225-2.327-7.476-2.387zm360.773.002c-2.25.06-4.783.83-7.474 2.385l-146.935 84.847c-9.57 5.527-17.14 18.638-17.14 29.69v157.7c0 11.05 7.57 15.418 17.14 9.89L428.97 373.51c9.57-5.527 17.137-18.636 17.137-29.688v-157.7c0-7.942-3.91-12.432-9.664-12.278zm-321.545 63.752c6.553 1.366 12.538 3.038 17.954 5.013 5.415 1.976 10.643 4.417 15.68 7.325 13.213 7.63 23.286 16.324 30.218 26.082 6.932 9.7 10.398 20.046 10.398 31.04 0 5.64-1.055 10.094-3.168 13.364-2.112 3.212-5.714 5.91-10.804 8.094l-5.2 1.92c-3.682 1.442-6.093 2.928-7.23 4.46-1.137 1.472-1.705 3.502-1.705 6.092v3.885l-29.325-16.933v-4.23c0-4.72.892-8.376 2.68-10.97 1.787-2.652 5.552-5.14 11.292-7.467l5.2-2.006c3.087-1.21 5.334-2.732 6.742-4.567 1.46-1.803 2.192-4.028 2.192-6.676 0-4.027-1.3-7.915-3.9-11.66-2.6-3.804-6.227-7.05-10.885-9.74-4.387-2.532-9.126-4.29-14.217-5.272-5.09-1.04-10.398-1.254-15.922-.645v-27.11zm269.54 8.607c1.522 0 2.932.165 4.232.493 6.932 1.696 10.398 8.04 10.398 19.034 0 5.64-1.056 11.314-3.168 17.023-2.112 5.65-5.714 12.507-10.804 20.568l-5.2 7.924c-3.682 5.695-6.093 9.963-7.23 12.807-1.137 2.785-1.705 5.473-1.705 8.063v3.885l-29.325 16.932v-4.23c0-4.72.894-9.41 2.68-14.067 1.79-4.715 5.552-11.55 11.292-20.504l5.2-8.01c3.087-4.776 5.334-8.894 6.742-12.354 1.46-3.492 2.192-6.562 2.192-9.21 0-4.028-1.3-6.414-3.898-7.158-2.6-.8-6.23.142-10.887 2.83-4.387 2.533-9.124 6.25-14.215 11.145-5.09 4.84-10.398 10.752-15.922 17.74v-27.11c6.553-6.2 12.536-11.44 17.95-15.718 5.417-4.278 10.645-7.87 15.68-10.777 10.738-6.2 19.4-9.302 25.99-9.307zm-252.723 94.515l29.326 16.93v30.736l-29.325-16.93v-30.735zm239.246 8.06v30.735l-29.325 16.93v-30.733l29.326-16.932z',
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      data-size={size}
      className={clsx(
        'dice-icon',
        'fill-current',
        size === 'xs' && 'w-4 h-4 md:w-5 md:h-5',
        size === 'sm' && 'w-8 h-8 md:w-10 md:h-10',
        size === 'md' && 'w-12 h-12 md:w-16 md:h-16',
      )}
    >
      <path d={dieType ? paths[dieType] : paths['dx']} fill="currentColor" />
    </svg>
  )
}

export default DiceIcon
