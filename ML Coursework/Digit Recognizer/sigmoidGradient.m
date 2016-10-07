function g = sigmoidGradient(z)
%SIGMOIDGRADIENT returns the gradient of the sigmoid function
%evaluated at z
%   g = SIGMOIDGRADIENT(z) computes the gradient of the sigmoid function
%   evaluated at z.

g = zeros(size(z));

sigmoid = sigmoid(z);
g = sigmoid .* (1 .- sigmoid);
end
